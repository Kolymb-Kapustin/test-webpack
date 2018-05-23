<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style lang="scss">
body{
	background: wheat;
	.example {
	  color: red;
	}
}

</style>
