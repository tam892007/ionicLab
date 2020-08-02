import * as PolicyConfig from './policy'


/**
 * Config object to be passed to MSAL on creation.
 * For a full list of msal.js configuration parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_configuration_.html
 * */

export const msalConfig = {
    auth: {
        clientId: '',
        authority: PolicyConfig.b2cPolicies.authorities.signUpSignIn.authority,
        validateAuthority: false
    },
    cache: {
        cacheLocation: 'localStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false // Set this to "true" to save cache in cookies to address trusted zones limitations in IE (see: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issues-on-IE-and-Edge-Browser)
    }
};

/**
 * Scopes you enter here will be consented once you authenticate. For a full list of available authentication parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
 */
export const loginRequest = {
    scopes: [ 'read',]
};


// Add here scopes for access token to be used at the API endpoints.
export const tokenRequest = {
    scopes: ["https://pixisidptest01.onmicrosoft.com/3e759779-6bf4-49ce-b10f-04f56b349736/read"],
};