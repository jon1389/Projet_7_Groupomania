export const checkAlpha = (input) => {
	const isAlpha = /^[a-zA-Zà-żÀ-Ż+\s+-]+$/;
	const value = input.target.value;
	console.log(value);
	if (isAlpha.test(value)) {
		input.target.className = "form-control is-valid";
	} else {
		input.target.className = "form-control is-invalid";
	}
};

export const checkEmail = (input) => {
	const isEmail =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const value = input.target.value;
	if (isEmail.test(value)) {
		input.target.className = "form-control is-valid";
	} else {
		input.target.className = "form-control is-invalid";
	}
};

export const checkPassword = (input) => {
	const isPassword =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const value = input.target.value;
	console.log(value);
	if (isPassword.test(value)) {
		input.target.className = "form-control is-valid";
	} else {
		input.target.className = "form-control is-invalid";
	}
};
