using UnityEngine;
using System.Collections;

public class LookAt : MonoBehaviour {

	public Camera target;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.LookAt(target.transform.position);
		transform.eulerAngles = new Vector3(0,transform.eulerAngles.y,0);
	}
}
