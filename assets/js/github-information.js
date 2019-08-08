function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                @<a href="${user.html_url}" target="_blank">${user.login}</a>
           </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url} target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"/>
                </a>
        </div>
        <p>Followers: ${user.followers} - Following: ${user.following} <br> Repos: ${user.public_repos}</p>`
};

function fetchGitHubInformation(event) {

    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)                            //When jQuery has obtained the data from these url's
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse) {
            var userData = firstResponse;
            var repoData = secondResponse;
            $("#gh-user-data").html(userInformationHTML(userData));                      //This will be executed, and display the data in the targeted ID
            $("#gh-repo-data").html(userInformationHTML(repoData)); 
        },
        function(errorResponse) {
            if (errorResponse.status === 404) {                                          //If the page is not found
                $("#gh-user-data").html(                                
                    `<h2>No info found for user ${username}</h2>`);                      //This will be inserted into the html, displaying the username the user searched for.
            } else {                                                                     //If the error is something other than a 404
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);            //This will display the error in the html   
            }
        });
}