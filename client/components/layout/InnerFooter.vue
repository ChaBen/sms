<template>
  <footer class="footer">
    <div class="container flex-direction-row">
      <nav>
        <ul>
          <li>
            <a href="/">
              Canada SMS
            </a>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, made with <md-icon>favorite</md-icon> by Canada SMS for a better web.
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    year: new Date().getFullYear()
  })
}
</script>
