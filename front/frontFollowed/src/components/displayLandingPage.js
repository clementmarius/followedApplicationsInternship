export default async function displayLandingPage(event, navigate, tryLogin) {
    event.preventDefault();
  
    const success = await tryLogin();
    if (success) {
      navigate("/landingPage");
    }
  }
  