<script>
export default {
  name: 'AuthMixin',
  created () {
    if (!this.$store.state.userId) this.$router.push('/login')
  }
}
</script>
