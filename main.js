;(function() {
	var users = [], update,contentEl, navEl, userContainer, ul, p, li, a;

	contentEl = document.querySelector(".content");
	userContainer = document.querySelector('#user-container');
	ul = document.createElement("ul");
	userContainer.appendChild(ul);
	p = document.createElement("p");
	contentEl.appendChild(p);

	class Person {
		constructor(name, lastName, age) {
			this.name = name;
			this.url = `http://localhost:8080/?name=${name}&lastname=${lastName}&age=${age}`;
			this.textContent = name;
			this.lastName = lastName;
			this.age = age;
			
			users.push(this);
			console.log(users);
		}
		render() {
			li = document.createElement("li");
			a = document.createElement("a");
			a.href = this.url;
			a.textContent = this.textContent;
			a.id = this.name;
			
			ul.appendChild(li);
			li.appendChild(a);
			console.log(li);
		}
	}

	(new Person("Bob", "Smith", 20)).render();
	(new Person("Bobby", "Smith", 22)).render();
	(new Person("Rob", "Smith", 23)).render();
	(new Person("Robert", "Smith", 25)).render();
	/////////
	updatestate = function(userName) {
		var user = users.find(e => e.name === userName),
		content = `Name: ${user.name}<br>Last Name: ${user.lastName}<br>Age: ${user.age} `;
		contentEl.innerHTML = content || "Page not found";
	}

	Array.from(document.querySelectorAll("a")).forEach(a => {
		a.addEventListener("click", function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
			var userName = a.getAttribute("id");
			updatestate(userName);
		});
	});

	window.addEventListener("popstate", function (e) {
		updatestate(e.state);
	});

})();