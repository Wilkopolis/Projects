using UnityEngine;
using System.Collections;

public class Shoot : MonoBehaviour {

	public float cooldown = .2f;
	private float cooldownremaining = 0;
//	public float range = 100f;

	public float fps = 10;
	private float count = 0;
	private int index = 0;
	public GUITexture viewmodel;
	public Texture idle;
	public Texture shoot1;
	public Texture shoot2;
	public Texture shoot3;
	public Texture shoot4;
	public Texture shoot5;
	private Texture[] frames;

	public float damage = 50f;

	// Use this for initialization
	void Start () {
		count = 1/fps;
		frames = new Texture[6];
		frames[0] = idle;
		frames[1] = shoot1;
		frames[2] = shoot2;
		frames[3] = shoot3;	
		frames[4] = shoot4;
		frames[5] = shoot5;
	}
	
	// Update is called once per frame
	void Update () {
		cooldownremaining -= Time.deltaTime;
		count -= Time.deltaTime;

		if (count <= 0 && index != 0) {	
			index = (index + 1)%6;
			viewmodel.texture = frames[index];
			count = 1/fps;
		}

		if(Input.GetMouseButton(0) && cooldownremaining <= 0)
		{
			Screen.lockCursor = true;
			cooldownremaining = cooldown;
			Ray ray = new Ray(Camera.main.transform.position, Camera.main.transform.forward);
			RaycastHit hitInfo;

			index = 1;

			if (Physics.Raycast(ray, out hitInfo))
			{
//				Debug.Log(hitInfo.point);
				if (hitInfo.collider.gameObject.GetComponent<HasHealth>() != null) {
					hitInfo.collider.gameObject.GetComponent<HasHealth>().Hit(damage);
				}
			}
		}
	}
}
