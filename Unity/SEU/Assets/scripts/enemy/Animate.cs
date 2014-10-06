using UnityEngine;
using System.Collections;

public class Animate : MonoBehaviour {

	public float fps = 1F;
	private float count = 0;

	private int index = 0;
	public Texture frame1;
	public Texture frame2;
	public Texture frame3;
	public Texture frame4;
	private Texture[] frames;

	// Use this for initialization
	void Start () {
		frames = new Texture[4];
		frames[0] = frame1;
		frames[1] = frame2;
		frames[2] = frame3;
		frames[3] = frame4;
	}
	
	// Update is called once per frame
	void Update () {
		count += Time.deltaTime;
		if (count > 1/fps)
		{
			renderer.material.SetTexture("_MainTex", frames[index++%4]);
			count = 0;
		}
	}
}
