// CampusBite Interactive Logic
document.addEventListener("DOMContentLoaded", () => {
  // 1. Logic for "Exclusive Student Discount" Alert
  const claimDiscount = () => {
    const promoCodes = ["CAMPUS20", "STUDENTBITE", "FREEMEAL"];
    const randomCode =
      promoCodes[Math.floor(Math.random() * promoCodes.length)];
    alert(
      `Your exclusive code is: ${randomCode}. Use it at checkout for 20% off!`,
    );
  };

  // 2. Real-time Order Tracking Simulation
  const simulateTracking = () => {
    let minutes = 12;
    console.log("Starting CampusBite delivery simulation...");

    const timer = setInterval(() => {
      minutes--;
      if (minutes <= 0) {
        console.log("Your CampusBite has arrived at the Library!");
        clearInterval(timer);
      } else {
        console.log(`Driver is 2 blocks away... ${minutes} mins left.`);
      }
    }, 1000);
  };

  // 3. Simple Event Listener for a "Get Started" button
  const ctaButton = document.querySelector("button");
  if (ctaButton) {
    ctaButton.addEventListener("click", () => {
      console.log("Redirecting to App Store...");
      claimDiscount();
    });
  }
});
