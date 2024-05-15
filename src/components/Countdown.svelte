<script>
  const startDate = new Date("May 15, 2024 00:00:00").getTime();

  let countdownTimer;
  let timeElapsed = "Loading...";
  let increment = "";

  function countdownClock() {
    const now = new Date().getTime();
    const distance = now - startDate;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days >= 0) {
      clearInterval(countdownTimer); //we don't need to run this each second if there are days elapsed
      timeElapsed = days;
      increment = "days since we were here";
    } else {
      clearInterval(countdownTimer);
      timeElapsed = "0 days since we were here";
      increment = "";
    }
  }
  countdownTimer = setInterval(countdownClock(), 1000);
</script>

<p class="text-center fs-5 runguszone">
  <span class="badge text-bg-info"
    ><span class="font-weight-bold" id="time">{timeElapsed}</span>
    <span id="increment">{increment}</span></span
  >
</p>
