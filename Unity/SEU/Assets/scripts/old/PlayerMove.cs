using UnityEngine;
using System.Collections;

public class PlayerMove : MonoBehaviour {

//	public float speed = 6.0F;
	public float jumpSpeed = 8.0F;
	public float gravity = 20.0F;
//	private float maxSpeed = 5F;
//	private float maxAirSpeed = 2F;
	private Vector3 vel;

	void Update() {
		CharacterController controller = GetComponent<CharacterController>();
		if (controller.isGrounded) {
			if (Input.GetButton("Jump"))
				vel.y = jumpSpeed;
		} else {
				vel.y -= gravity * Time.deltaTime;
		}
		controller.Move(vel * Time.deltaTime);
//		if (controller.isGrounded) {
//			moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
//			moveDirection = transform.TransformDirection(moveDirection);
//			moveDirection *= speed;
//			if (Input.GetButton("Jump"))
//				moveDirection.y = jumpSpeed;			
//		} else {
//			Vector3 force = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
//			force = transform.TransformDirection(moveDirection);
//			if (Mathf.Abs(moveDirection.x) < maxSpeed)
//				moveDirection += force;
//		}
//		moveDirection.y -= gravity * Time.deltaTime;
//		controller.Move(moveDirection * Time.deltaTime);
	}
}