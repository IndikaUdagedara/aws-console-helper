function initialise() {

	var role = $("#menu--account > div > ul > li").attr("title")
	if (role)
	{
		var re_role = /(.*)\/(.*)/
		var m = role.match(re_role)

		var elem = $("#nav-usernameMenu > span > span").first()
		var account = $("#menu--account > div > ul > li:nth-child(1) > span").text().replace(/-/g, "")

		lookup(m[1], m[2], account, function(l) {
			console.log(l);
			elem.text(`${l.userAlias} @ ${l.accountAlias}/${l.roleAlias}`)
			elem.css('max-width', '400px')
		})

		return
	}

	var re_user = /(.*) @ (.*)/
	elem = $("#nav-usernameMenu > div.nav-elt-label");
	val = elem.attr("title");
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

