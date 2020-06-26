function initialise() {

	var elem = $('#nav-usernameMenu > div.nav-elt-label');
	var val = elem.attr('title')

	
	//  AWSxxxxx/aa@yy.com @ 11111111111
	var re_role = /(.*)\/(.*) @ (.*)/

	// user @ 11111111111
	var re_user = /(.*) @ (.*)/


	var m = val.match(re_role)
	

	if (m)
	{
		lookup(m[1], m[2], m[3], function(l) {
			console.log(l);
			elem.text(`${l.userAlias} @ ${l.accountAlias}/${l.roleAlias}`)
			elem.css('max-width', '400px')
		})

		return
	}

	m = val.match(re_user)

	if (m)
	{
		lookup("", m[1], m[2], function(l) {
			console.log(l);
			elem.text(`${l.userAlias} @ ${l.accountAlias}`)
			elem.css('max-width', '400px')
		})
	}
}

function lookup(role, user, account, f) {

	var roles, users, accounts;

	chrome.storage.sync.get('options', function(items) {

		if (items != null) {
			accounts = items.options.accounts;
			roles = items.options.roles;
			users = items.options.users;
		}

		// arn:aws:iam::11111111111:role/aws-reserved/sso.amazonaws.com/ap-southeast-2/AWSReservedSSO_AdministratorAccess_xxxx

		f({
			roleAlias : roles[role] || role,
			userAlias: users[user] || user,
			accountAlias: accounts[account] || account
		});
	  }
	)
}

initialise();

