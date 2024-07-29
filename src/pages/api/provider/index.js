const eimzoProvider = {
  id: "eimzo",
  name: "Eimzo",
  type: "oauth",
  idToken: true,
  authorizationUrl:
    "https://accounts.google.com/o/oauth2/auth?response_type=code",
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    };
  },
};
