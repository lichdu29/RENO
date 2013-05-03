var UserLoginController = Composer.Controller.extend({
	inject: tagit.main_container_selector,

	elements: {
		'input[name=username]': 'inp_username',
		'input[name=password]': 'inp_password'
	},

	events: {
		'submit form': 'do_login'
	},

	init: function()
	{
		this.render();
	},

	render: function()
	{
		var content = Template.render('users/login');
		this.html(content);
		this.inp_username.focus();
	},

	do_login: function(e)
	{
		if(e) e.stop();
		var username = this.inp_username.get('value');
		var password = this.inp_password.get('value');
		var user = new User({
			username: username,
			password: password
		});

		tagit.loading(true);
		user.test_auth({
			success: function(id) {
				var data = user.toJSON();
				data.id = id;
				tagit.user.login(data);
				tagit.loading(false);
				tagit.route('/');
			}.bind(this),
			error: function(e) {
				barfr.barf('Login failed.');
				tagit.loading(false);
			}.bind(this)
		});
	}
});