import "express-session";

declare module "express-session" 
{
    interface SessionData
    {
        loggedIn : boolean,
        userId : number,
        username : string,
        email: string,
        type : string
    }
}