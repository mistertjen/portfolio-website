(function () {
	if(typeof Github != 'undefined') {
		Github.userActivity({
		    username: "mistertjen",
		    selector: ".user-2",
		    limit: 20
		});
		// document.getElementsByClassName('button')[0].href = 'mailto:timothytjenalooi@gmail.com';
	}
})();

(function () {
	if (document.getElementsByClassName('project-container')[0]) {
		
		//=AJAX CALL TO GITHUB
		var githubRepos = new XMLHttpRequest();
		githubRepos.onreadystatechange = parseGithubRepos;
		githubRepos.open('GET', 'https://api.github.com/users/mistertjen/repos', true)
		githubRepos.send();

		//=PARSE DATA
		function parseGithubRepos () {
			if (githubRepos.readyState == 4 && githubRepos.status == 200 ) {
				githubRepos = JSON.parse(githubRepos.responseText);
				for (var i = 0, repos = {}; i < githubRepos.length; i++) {
					// in the future update conditions.
					if (githubRepos[i]['size'] > 1000) {
						// OBJECT WHERE KEYS ARE THE REPO NAMES
						repos[githubRepos[i]['name']] = githubRepos[i];
					};
				}

				//=DATA TO HTML
				var counter = 0;
				for (keys in repos) {
					document.getElementsByClassName('showcase-project-title')[counter].innerHTML = repos[keys]['name'];
					document.getElementsByClassName('showcase-project-link')[counter].href = repos[keys]['html_url'];
					document.getElementsByClassName('showcase-lastest-push')[counter].innerHTML = 'Lastest push on: ' +	String(new Date(repos[keys]['pushed_at'])).slice(4,15);
					document.getElementsByClassName('showcase-project-languages')[counter].innerHTML = 'Languages: ' + repos[keys]['language'];
					document.getElementsByClassName('ajax-show')[counter].style.display = "block";
				}				
				// fix authentication.
				// html template.
			}
			// I need to build my own API to host images of my projects?
			// Also need to add descriptions.
		}
	}
})();