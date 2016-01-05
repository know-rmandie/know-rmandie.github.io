/* W A R N I N G */
/*---------------*/
/*
this is a pretty INSECURE way to make issues sent to your gitlab project.
Giving you own token with full privilege here CAN NOT BE SECURE. It can be grabbed by any (even very bad) hacker and give him access to your whole projects on gitlab.
So you SHOULD create a secondary account with only GUEST PRIVILEGE and grab corresponding token here. So the hacker will "only" spam your issue box until you reset token.
*/
// gitlab repo url
var gitlab="git.framasoft.org";
// project id in gitlab
var project="territoires%2FanalyseUrbanisme";
// token !WARNING!
var token="this_is_your_SECONDARY_gitlab_token_with_ONLY_GUEST_PRIVILEGE";
