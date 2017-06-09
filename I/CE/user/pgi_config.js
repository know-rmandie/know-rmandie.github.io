/* Config file for pGi - posting Gitlab issues */

/* W A R N I N G ! ! !
This is a pretty INSECURE way to make issues sent to your gitlab project. Using your own personal token with full privilege here CAN NOT BE SECURE. It can be grabbed by any (even very bad) hacker and give him access to your whole projects on gitlab. So you SHOULD create a secondary account with only GUEST PRIVILEGE and grab corresponding token here. This way the hacker will "only" spam your issue box until you reset token.
*/

var pGi={
/* G I T L A B repo informations */
   gitlab:"gitlab.com",                        // gitlab repo url
   usgroup:"know-rmandie",                     // gitlab username or group name where the project is
   project:"lektor",                           // project id in gitlab - should not contain any dot (. nor "%2E")
   token:"MDXWmKzdfFp5aqheq_1S",               // token !WARNING! this_is_your_SECONDARY_gitlab_token_with_ONLY_GUEST_PRIVILEGE
/* F I E L D S list*/
   form:[
       {name:"titre",type:"text",dest:"title",def:"objet de la remarque",req:true,hid:false},
       {name:"etiquette",type:"text",dest:"labels",def:"ville-durable",req:false,hid:true},
       {name:"comment",type:"textarea",dest:"description",def:"merci de préciser...",req:false,hid:false}
   ],
   intro:"N'hésitez pas à faire vos remarques, commentaires, propositions d'améliorations pour cet outil.",
   thanks:"Merci de nous aider à améliorer la cartographie de la ville durable en Normandie.",
   autoclose:false
}
/* H E L P
// about integration
by default, PGI form is hidden. It will be shown when clicking on any element with the `.pgiButton` class

// about fields
name : text - the name of the field
type : text - one of the accepted html type of fields -
destination : text - one of the accepted gitlab issue post method - http://doc.gitlab.com/ce/api/issues.html#new-issue
default : text - default value for the field
required : boolean - is the field required?
hidden : boolean - do you want to hide this field?

// about styles
the script will create a new div called "pgiDiv" with "pgiDiv" class at the end of your document containing the comment form
you can customize style by creating a stylesheet declaring styles for #pgiDiv or .pgiDiv elements*/
