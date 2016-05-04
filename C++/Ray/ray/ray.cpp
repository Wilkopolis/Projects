#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <GL/glut.h>

#include "udray.h"
#include "glm.h"

// #include <thread>

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

extern Camera *ray_cam;       // camera info
extern int image_i, image_j;  // current pixel being shaded
extern bool wrote_image;      // has the last pixel been shaded?

// reflection/refraction recursion control

extern int maxlevel;          // maximum depth of ray recursion 
extern double minweight;      // minimum fractional contribution to color

// these describe the scene

extern vector < GLMmodel * > model_list;
extern vector < Sphere * > sphere_list;
extern vector < Light * > light_list;

#define distance_attenuation_factor 20
#define diff_atten_exp .00015
#define spec_atten_exp .0002

#define ray_depth 3
#define depth_begin 0
#define depth_end 8
// 0 = color, ambiant, specular, diffuse
// 1 = depth by ray 
// 2 = depth by obj 
// 3 = reflections
#define render_style 3
#define max_threads 4
#define air_ior .1

int thread_count;

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

// intersect a ray with the entire scene (.obj models + spheres)

// x, y are in pixel coordinates with (0, 0) the upper-left hand corner of the image.
// color variable is result of this function--it carries back info on how to draw the pixel

void trace_ray(int level, double weight, Ray *ray, Vect color)
{
	Intersection *nearest_inter = NULL;
	Intersection *inter = NULL;
	int i;

	// test for intersection with all .obj models

	for (i = 0; i < model_list.size(); i++) {
		inter = intersect_ray_glm_object(ray, model_list[i]);
		update_nearest_intersection(&inter, &nearest_inter);
	}

	// test for intersection with all spheres

	for (i = 0; i < sphere_list.size(); i++) {
		inter = intersect_ray_sphere(ray, sphere_list[i]);
		update_nearest_intersection(&inter, &nearest_inter);
	}

	// "color" the ray according to intersecting surface properties

	// choose one of the simpler options below to debug or preview your scene more quickly.
	// another way to render faster is to decrease the image size.

	if (nearest_inter) {
		if (render_style == 0) {
			shade_ray_local_distance(ray, nearest_inter, color, 0);
		} else if (render_style == 1) {			
			shade_ray_depth(ray, nearest_inter, color);
		} else if (render_style == 2) {
			shade_obj_depth(ray, nearest_inter, color);
		} else if (render_style == 3) {
			shade_ray_recursive(0, ray, nearest_inter, color, 0);
		}		
		free(nearest_inter);
		nearest_inter = NULL;
	}

	// color the ray using a default

	else
		shade_ray_background(ray, color); 
}

//----------------------------------------------------------------------------

// test for ray-sphere intersection; return details of intersection if true

Intersection *intersect_ray_sphere(Ray *ray, Sphere *S)
{
	Vect v, p, n;
	double t1, t2, t;
	double a, b, c, q;
	double discriminant;
	Intersection *inter;

	VectSub(S->P, ray->orig, v);

	a = VectDotProd(ray->dir, ray->dir);
	b = 2 * VectDotProd(ray->dir, v);
	c = VectDotProd(v, v) - S->radius * S->radius;

	discriminant = b * b - 4 * a * c;
	if (discriminant < 0)
		// miss
		return NULL;
	else if (discriminant == 0) {
		// 1 hit
		t = b * -.5 / a;
		if (t < 0) 
			return NULL;
	} else {
		// 2 hits		
		t1 = (b + pow(discriminant,.5)) * .5 / a;
		t2 = (b - pow(discriminant,.5)) * .5 / a;	
		if (t1 < 0 && t2 < 0)
			return NULL;
		if (t1 < 0)
			t = t2;
		if (t2 < 0)
			t = t1;		
		t = (t1 < t2) ? t1 : t2;	
	}

	inter = make_intersection();

	VectAddS(t, ray->dir, ray->orig, p);
	VectCopy(inter->P, p);

	inter->t = t;

	VectSub(inter->P, S->P, n);
	VectUnit(n);

	// set normal

	inter->N[X] = n[X];
	inter->N[Y] = n[Y];
	inter->N[Z] = n[Z];

	// set surface properties

	inter->surf = S->surf;

	inter->objP[0] = S->P[0];
	inter->objP[1] = S->P[1];
	inter->objP[2] = S->P[2];

	inter->sphere = S;

	return inter;
}

//----------------------------------------------------------------------------

// test for ray-sphere intersection; return details of intersection if true
// now with a maximum distance

Intersection *intersect_ray_sphere_to_light(Ray *ray, Sphere *S, double max_distance)
{
	Vect v, p, n;
	double t1, t2, t;
	double a, b, c, q;
	double discriminant;
	Intersection *inter;

	VectSub(S->P, ray->orig, v);

	a = VectDotProd(ray->dir, ray->dir);
	b = 2 * VectDotProd(ray->dir, v);
	c = VectDotProd(v, v) - S->radius * S->radius;

	discriminant = b * b - 4 * a * c;
	if (discriminant < 0)
		// miss
		return NULL;
	else if (discriminant == 0) {
		// 1 hit
		t = b * -.5 / a;
		if (t < 0) 
			return NULL;
	} else {
		// 2 hits		
		t1 = (b + pow(discriminant,.5)) * .5 / a;
		t2 = (b - pow(discriminant,.5)) * .5 / a;	
		if (t1 < 0 && t2 < 0)
			return NULL;
		if (t1 < 0)
			t = t2;
		if (t2 < 0)
			t = t1;		
		t = (t1 < t2) ? t1 : t2;	
	}

	if (t > max_distance)
		return NULL;

	inter = make_intersection();

	VectAddS(t, ray->dir, ray->orig, p);
	VectCopy(inter->P, p);

	inter->t = t;

	VectSub(inter->P, S->P, n);
	VectUnit(n);

	// set normal

	inter->N[X] = n[X];
	inter->N[Y] = n[Y];
	inter->N[Z] = n[Z];

	// set surface properties

	inter->surf = S->surf;

	inter->objP[0] = S->P[0];
	inter->objP[1] = S->P[1];
	inter->objP[2] = S->P[2];

	inter->sphere = S;

	return inter;
}

//----------------------------------------------------------------------------

// colors pixels based on their depth

void shade_ray_depth(Ray *ray, Intersection *inter, Vect color) {

	double depth = inter->t;
	if (depth <= depth_begin) {
		depth = depth_begin;
	} else if (depth >= depth_end) {
		depth = depth_end;
	}

	color[R] += depth/(depth_end - depth_begin);
	color[G] += depth/(depth_end - depth_begin);
	color[B] += depth/(depth_end - depth_begin);
}

//----------------------------------------------------------------------------

// colors objects based on their depth

void shade_obj_depth(Ray *ray, Intersection *inter, Vect color) {

	Vect distance;
	VectSub(ray->orig, inter->objP, distance);
	double depth = VectMag(distance);

	if (depth <= depth_begin) {
		depth = depth_begin;
	} else if (depth >= depth_end) {
		depth = depth_end;
	}

	color[R] += depth/(depth_end - depth_begin);
	color[G] += depth/(depth_end - depth_begin);
	color[B] += depth/(depth_end - depth_begin);
}

//----------------------------------------------------------------------------

// only local, ambient + diffuse lighting (no specular, shadows, reflections, or refractions)

void shade_ray_diffuse(Ray *ray, Intersection *inter, Vect color)
{
	Vect L;
	double diff_factor;
	double attenuation;
	// iterate over lights

	for (int i = 0; i < light_list.size(); i++) {

		// AMBIENT

		color[R] += inter->surf->amb[R] * light_list[i]->amb[R];
		color[G] += inter->surf->amb[G] * light_list[i]->amb[G];
		color[B] += inter->surf->amb[B] * light_list[i]->amb[B];

		// Calculate the look vector for each light
		VectSub(light_list[i]->P, inter->P, L);
		attenuation = VectMag(L);
		VectUnit(L);

		// DIFFUSE 
		diff_factor = VectDotProd(inter->N, L);
		if (diff_factor > 0 ) {
			color[R] += inter->surf->diff[R] * light_list[i]->diff[R] * diff_factor / pow(attenuation,1.5);
			color[G] += inter->surf->diff[G] * light_list[i]->diff[G] * diff_factor / pow(attenuation,1.5);
			color[B] += inter->surf->diff[B] * light_list[i]->diff[B] * diff_factor / pow(attenuation,1.5);
		}
	}

	// clamp color to [0, 1]

	VectClamp(color, 0, 1);
}

//----------------------------------------------------------------------------

// same as shade_ray_diffuse(), but add specular lighting + shadow rays (i.e., full Phong illumination model)
// we add a distance so far
void shade_ray_local_distance(Ray *ray, Intersection *inter, Vect color, double distance_so_far) 
{
	int i, j, k;

	// diffuse component

	Vect light;
	double diff_factor;
	double diff_attenuation;

	// specular component

	Vect lightVect;
	Vect viewVect;
	Vect halfVect;
	double dotprod;
	double shinyness;
	double spec_attenuation;

	// shadow component

	Vect dir;
	Vect ori;
	Vect shifted_ori;
	Ray *ray_to_light = NULL;
	Intersection *light_inter = NULL;
	Intersection *nearest_light_inter = NULL;
	double distance;

	// reflection
	double reflection_coeff = 1 - inter->surf->reflectivity;

	// refraction
	double transparency_coeff = 1 - inter->surf->transparency;

	for (i = 0; i < light_list.size(); i++) {

		// ambient

		// color[R] += inter->surf->amb[R] * light_list[i]->amb[R] * reflection_coeff * transparency_coeff;
		// color[G] += inter->surf->amb[G] * light_list[i]->amb[G] * reflection_coeff * transparency_coeff;
		// color[B] += inter->surf->amb[B] * light_list[i]->amb[B] * reflection_coeff * transparency_coeff;
		color[R] += inter->surf->amb[R] * light_list[i]->amb[R];
		color[G] += inter->surf->amb[G] * light_list[i]->amb[G];
		color[B] += inter->surf->amb[B] * light_list[i]->amb[B];

		// shadows

		VectSub(light_list[i]->P, inter->P, dir);
		distance = VectMag(dir);
		VectUnit(dir);
		VectCopy(ori, inter->P);
		VectAddS(.001, inter->N, ori, shifted_ori);

		ray_to_light = make_ray(shifted_ori, dir);

		for (j = 0; j < model_list.size(); j++) {
			light_inter = intersect_ray_glm_object_to_light(ray_to_light, model_list[j], distance);
			update_nearest_intersection(&light_inter, &nearest_light_inter);
		}

		for (k = 0; k < sphere_list.size(); k++) {
			light_inter = intersect_ray_sphere_to_light(ray_to_light, sphere_list[k], distance);
			update_nearest_intersection(&light_inter, &nearest_light_inter);
		}

		free (ray_to_light);
		ray_to_light = NULL;

		// if we aren't occluded

		if (!nearest_light_inter) {

			// Diffuse

			// Calculate the look vector for each light
			VectSub(light_list[i]->P, inter->P, light);
			diff_attenuation = (VectMag(light) + distance_so_far) / distance_attenuation_factor;
			VectUnit(light);

			diff_factor = VectDotProd(inter->N, light);
			if (diff_factor > 0 ) {
				color[R] += inter->surf->diff[R] * light_list[i]->diff[R] * diff_factor / pow(diff_attenuation, diff_atten_exp) * reflection_coeff * transparency_coeff;
				color[G] += inter->surf->diff[G] * light_list[i]->diff[G] * diff_factor / pow(diff_attenuation, diff_atten_exp) * reflection_coeff * transparency_coeff;
				color[B] += inter->surf->diff[B] * light_list[i]->diff[B] * diff_factor / pow(diff_attenuation, diff_atten_exp) * reflection_coeff * transparency_coeff;			
			}

			// Specular

			VectSub(ray->orig, inter->P, viewVect);
			VectUnit(viewVect);

			VectSub(light_list[i]->P, inter->P, lightVect);
			spec_attenuation = (VectMag(lightVect) + distance_so_far) / distance_attenuation_factor;
			VectUnit(lightVect);

			VectAddS(1,lightVect,viewVect,halfVect);
			VectUnit(halfVect);

			dotprod = VectDotProd(inter->N, halfVect);
			shinyness = pow(dotprod, inter->surf->spec_exp);			

			if (dotprod > 0) 
			{
				color[R] += inter->surf->spec[R] * light_list[i]->spec[R] * shinyness / pow(spec_attenuation, spec_atten_exp) * reflection_coeff;
				color[G] += inter->surf->spec[G] * light_list[i]->spec[G] * shinyness / pow(spec_attenuation, spec_atten_exp) * reflection_coeff;
				color[B] += inter->surf->spec[B] * light_list[i]->spec[B] * shinyness / pow(spec_attenuation, spec_atten_exp) * reflection_coeff;
			}
		}
		else
		{
			// shadow

			free(nearest_light_inter);
			nearest_light_inter = NULL;
		}
	}
	VectClamp(color, 0, 1);
}

//----------------------------------------------------------------------------

// same as shade_ray_diffuse(), but add specular lighting + shadow rays (i.e., full Phong illumination model)

void shade_ray_local(Ray *ray, Intersection *inter, Vect color) 
{
	// diffuse component

	Vect light;
	double diff_factor;
	double diff_attenuation;

	// specular component

	Vect lightVect;
	Vect viewVect;
	Vect halfVect;
	double dotprod;
	double shinyness;
	double spec_attenuation;

	// shadow component

	Vect dir;
	Vect ori;
	Vect shifted_ori;
	Ray *ray_to_light = NULL;
	Intersection *light_inter = NULL;
	Intersection *nearest_light_inter = NULL;
	double distance;

	// reflection
	double reflection_coeff = 1 - inter->surf->reflectivity;

	for (int i = 0; i < light_list.size(); i++) {

		// ambient

		color[R] += inter->surf->amb[R] * light_list[i]->amb[R] * reflection_coeff;
		color[G] += inter->surf->amb[G] * light_list[i]->amb[G] * reflection_coeff;
		color[B] += inter->surf->amb[B] * light_list[i]->amb[B] * reflection_coeff;

		// shadows

		VectSub(light_list[i]->P, inter->P, dir);
		distance = VectMag(dir);
		VectUnit(dir);
		VectCopy(ori, inter->P);
		VectAddS(.001, inter->N, ori, shifted_ori);

		ray_to_light = make_ray(shifted_ori, dir);

		for (int j = 0; j < model_list.size(); j++) {
			light_inter = intersect_ray_glm_object_to_light(ray_to_light, model_list[j], distance);
			update_nearest_intersection(&light_inter, &nearest_light_inter);
		}

		for (int k = 0; k < sphere_list.size(); k++) {
			light_inter = intersect_ray_sphere_to_light(ray_to_light, sphere_list[k], distance);
			update_nearest_intersection(&light_inter, &nearest_light_inter);
		}

		// if we aren't occluded

		if (!nearest_light_inter) {

			// Diffuse

			// Calculate the look vector for each light
			VectSub(light_list[i]->P, inter->P, light);
			diff_attenuation = VectMag(light);
			VectUnit(light);

			diff_factor = VectDotProd(inter->N, light);
			if (diff_factor > 0 ) {
				color[R] += inter->surf->diff[R] * light_list[i]->diff[R] * diff_factor / pow(diff_attenuation, diff_atten_exp) * reflection_coeff;
				color[G] += inter->surf->diff[G] * light_list[i]->diff[G] * diff_factor / pow(diff_attenuation, diff_atten_exp) * reflection_coeff;
				color[B] += inter->surf->diff[B] * light_list[i]->diff[B] * diff_factor / pow(diff_attenuation, diff_atten_exp) * reflection_coeff;
			}

			// Specular

			VectSub(ray->orig, inter->P, viewVect);
			VectUnit(viewVect);

			VectSub(light_list[i]->P, inter->P, lightVect);
			spec_attenuation = VectMag(lightVect);
			VectUnit(lightVect);

			VectAddS(1,lightVect,viewVect,halfVect);
			VectUnit(halfVect);

			dotprod = VectDotProd(inter->N, halfVect);
			shinyness = pow(dotprod, inter->surf->spec_exp);			

			if (dotprod > 0) 
			{
				color[R] += inter->surf->spec[R] * light_list[i]->spec[R] * shinyness / pow(spec_attenuation, spec_atten_exp) * reflection_coeff;
				color[G] += inter->surf->spec[G] * light_list[i]->spec[G] * shinyness / pow(spec_attenuation, spec_atten_exp) * reflection_coeff;
				color[B] += inter->surf->spec[B] * light_list[i]->spec[B] * shinyness / pow(spec_attenuation, spec_atten_exp) * reflection_coeff;
			}

		}
		else
		{
			//debug
			// VectPrint(dir);
		}
	}
	VectClamp(color, 0, 1);
}

//----------------------------------------------------------------------------

// full shading model: ambient/diffuse/specular lighting, shadow rays, recursion for reflection, refraction

// level = recursion level (only used for reflection/refraction)

void shade_ray_recursive(int level, Ray *ray, Intersection *inter, Vect color, double distance)
{
	// initialize color to Phong reflectance model

	shade_ray_local_distance(ray, inter, color, distance);

	// if not too deep, recurse

	if (level < ray_depth) {

		// add reflection component to color

		if (inter->surf->reflectivity > 0) {

			// reflection 

			Vect dir;					// r = d - 2(d dot n)n
			Vect ori;					// inter->P
			Vect shifted_ori;			// ori + inter->N * .001
			Ray *new_ray = NULL;
			Intersection *new_inter = NULL;
			Intersection *nearest_new_inter = NULL;
			double dp;
			double distance_in; 

			// find new ray

			distance_in = inter->t;

			dp = VectDotProd(ray->dir, inter->N);
			VectAddS(-2 * dp, inter->N, ray->dir, dir);
			VectUnit(dir);

			VectCopy(ori, inter->P);

			VectAddS(.001, inter->N, ori, shifted_ori);

			new_ray = make_ray(shifted_ori, dir);

			// check for new inter

			for (int j = 0; j < model_list.size(); j++) {
				new_inter = intersect_ray_glm_object(new_ray, model_list[j]);
				update_nearest_intersection(&new_inter, &nearest_new_inter);
			}

			for (int k = 0; k < sphere_list.size(); k++) {
				new_inter = intersect_ray_sphere(new_ray, sphere_list[k]);
				update_nearest_intersection(&new_inter, &nearest_new_inter);
			}

			if (nearest_new_inter) {
				shade_ray_recursive(level + 1, new_ray, nearest_new_inter, color, distance + distance_in);
				free(nearest_new_inter);
				nearest_new_inter = NULL;
			}

			free(new_ray);
			new_ray = NULL;
		}

		// add refraction component to color

		if (inter->surf->transparency > 0) {

			// into medium

			Vect ndir;
			Vect dir;
			Vect ori;
			Vect shifted_ori;
			Vect t, z;
			double dp, distance_out;
			double nr, ni, a;
			Ray *new_ray = NULL;
			Intersection *new_inter = NULL;	

			z[X] = 0;
			z[Y] = 0;
			z[Z] = 0;

			nr = inter->surf->ior;
			ni = air_ior;	// air

			dp = -1 * VectDotProd(inter->N, ray->dir);

			a = (nr * dp - sqrt(1 - nr*nr*(1 - (dp * dp))));
			VectAddS(-1 * nr, ray->dir, z, t);
			VectAddS(a, inter->N, t, ndir);
			VectUnit(ndir);

			VectNegate(ndir, dir);

			VectCopy(ori, inter->P);

			VectAddS(-.005, inter->N, ori, shifted_ori);

			// make more shallow angles less transparent
			// distance_out = inter->t * -1 * dp;

			distance_out = inter->t;

			// ray

			new_ray = make_ray(shifted_ori, dir);
			
			if (inter->model)
				new_inter = intersect_ray_glm_object(new_ray, inter->model);
			else
				new_inter = intersect_ray_sphere(new_ray, inter->sphere);	

			if (new_inter) {
				//out of medium

				Ray *out_ray = NULL;
				Intersection *out_inter = NULL;
				Intersection *nearest_out_inter = NULL;

				// find new ray

				nr = new_inter->surf->ior;
				ni = air_ior;	// air

				dp = -1 * VectDotProd(new_inter->N, new_ray->dir);

				a = (nr * dp - sqrt(1 - nr*nr*(1 - (dp * dp))));
				VectAddS(-1 * nr, new_ray->dir, z, t);
				VectAddS(a, new_inter->N, t, ndir);
				VectUnit(ndir);

				VectNegate(dir, ndir);

				VectCopy(ori, new_inter->P);

				VectAddS(.005, inter->N, ori, shifted_ori);

				out_ray = make_ray(shifted_ori, dir);

				// check for new inter

				for (int j = 0; j < model_list.size(); j++) {
					out_inter = intersect_ray_glm_object(out_ray, model_list[j]);
					update_nearest_intersection(&out_inter, &nearest_out_inter);
				}

				for (int k = 0; k < sphere_list.size(); k++) {
					out_inter = intersect_ray_sphere(out_ray, sphere_list[k]);
					update_nearest_intersection(&out_inter, &nearest_out_inter);
				}

				if (nearest_out_inter) {
					
					distance_out += nearest_out_inter->t;

					shade_ray_recursive(level + 1, out_ray, nearest_out_inter, color, distance + distance_out);

					free(nearest_out_inter);
					nearest_out_inter = NULL;
				}

				free(new_ray);
				new_ray = NULL;
				free(out_ray);
				out_ray = NULL;
			}
		}
	}
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

// ray trace another pixel if the image isn't finished yet

void idle()
{
	if (image_j < ray_cam->im->h) {

		raytrace_one_pixel(image_i, image_j);

		image_i++;

		if (image_i == ray_cam->im->w) {
			image_i = 0;
			image_j++;
		}    
	}

	// write rendered image to file when done

	else if (!wrote_image) {

		write_PPM("output.ppm", ray_cam->im);

		wrote_image = true;
	}

	glutPostRedisplay();
}

void render()
{
	// thread_count = 0;
	
	// while (!(image_j == ray_cam->im->h)) 
	// {
	// 	if (thread_count < max_threads) {
	// 		thread_count++;
	// 		thread (raytrace_one_pixel, image_i, image_j);
	// 		glutPostRedisplay();
	// 	}
	// }
}

//----------------------------------------------------------------------------

// show the image so far

void display(void)
{
	// draw it!

	glPixelZoom(1, -1);
	glRasterPos2i(0, ray_cam->im->h);

	glDrawPixels(ray_cam->im->w, ray_cam->im->h, GL_RGBA, GL_FLOAT, ray_cam->im->data);

	glFlush();
}

//----------------------------------------------------------------------------

void init()
{
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluOrtho2D(0.0, ray_cam->im->w, 0.0, ray_cam->im->h);
}

//----------------------------------------------------------------------------

int main(int argc, char** argv)
{
	glutInit(&argc, argv);

	// initialize scene (must be done before scene file is parsed)

	init_raytracing();

	if (argc == 2)
		parse_scene_file(argv[1], ray_cam);
	else {
		printf("missing .scene file\n");
		exit(1);
	}

	// opengl business

	glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
	glutInitWindowSize(ray_cam->im->w, ray_cam->im->h);
	glutInitWindowPosition(500, 300);
	glutCreateWindow("hw3");
	init();

	glutDisplayFunc(display); 
	glutIdleFunc(idle);

	glutMainLoop();

	// render();

	return 0; 
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
