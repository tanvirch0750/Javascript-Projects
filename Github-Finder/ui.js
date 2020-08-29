class UI {
  constructor() {
    this.profile = document.getElementById("profile");
  }

  showProfile(user) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img src="${user.avatar_url}" alt="avatar" class="img-fluid mb-2" />
          <a
            href="${user.html_url}"
            target="_blank"
            class="btn btn-primary btn-block mb-4"
            >View Profile</a
          >
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary p-2 mb-2 mr-2">Public repository: &nbsp; ${user.public_repos}</span>
          <span class="badge badge-warning p-2 mb-2 mr-2">Public Gists: &nbsp; ${user.public_gists}</span>
          <span class="badge badge-success p-2 mb-2 mr-2">Followers: &nbsp; ${user.followers}</span>
          <span class="badge badge-danger p-2 mb-2 mr-2">Following: &nbsp; ${user.following}</span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Company: &nbsp; ${user.company}</li>
            <li class="list-group-item">Website/Blog:  &nbsp; ${user.blog}</li>
            <li class="list-group-item">Location:  &nbsp; ${user.location}</li>
            <li class="list-group-item">Member Since:  &nbsp; ${user.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
  <h3 class="page-heading mb-3">Latest Repository</h3>
  <div id="repos"></div>
    `;
  }

  showRepos(repos) {
    let output = "";
    repos.forEach((repo) => {
      output += `
      <div class="card card-body mb-2">
      <div class="row">
        <div class="col-md-6 mb-2">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </div>
        <div class="col-md-6 text-center">
          <span class="badge badge-primary mb-2 mr-2"
            >Stars: &nbsp; ${repo.stargazers_count}</span
          >
          <span class="badge badge-warning mb-2 mr-2"
            >Watchers: &nbsp; ${repo.watchers_count}</span
          >
          <span+ class="badge badge-success mb-2 mr-2"
            >Forks: &nbsp; ${repo.forks_count}</span+
          >
        </div>
      </div>
    </div>
      `;
    });

    // output repos
    document.getElementById("repos").innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".searchContainer");
    const search = document.querySelector(".search");
    container.insertBefore(div, search);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearProfile() {
    this.profile.innerHTML = "";
  }
}
