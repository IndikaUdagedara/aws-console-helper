function initialise() {

	var elem = $('#nav-usernameMenu > div.nav-elt-label');
	var val = elem.attr('title')

	
	//  AWSxxxxx/aa@yy.com @ 11111111111
	var re = /(.*)\/(.*) @ (.*)/

	var m = val.match(re)
	if (!m)
	{
		console.log('Unable to parse ', val)
		return;
	}

	var l = lookup(m[1], m[2], m[3], function(l) {
		elem.text(`${l.userAlias} @ ${l.accountAlias}/${l.roleAlias}`)
		elem.css('max-width', '400px')
	})
	console.log(l);
	
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

