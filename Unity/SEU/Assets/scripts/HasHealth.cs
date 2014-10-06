using UnityEngine;
using System.Collections;

public class HasHealth : MonoBehaviour {

	public float HP = 100f;

	public bool Hit(float damage)
	{
		HP -= damage;
		if (HP <= 0)
		{
			Die();
			return true;
		}
		return false;
	}

	private void Die()
	{
		Destroy(gameObject);
	}
}
