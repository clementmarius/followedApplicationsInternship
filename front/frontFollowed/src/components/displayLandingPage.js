export default async function displayLandingPage(event, navigate, tryLogin) {
  event.preventDefault();

  const success = await tryLogin();
  console.log("Redirecting?", success);  
  if (success) {
    navigate("/landingPage");
  }
}
