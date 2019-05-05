<template>
<div class="container">
  <h1>U. S. Small Business Administration <br> DISASTER BUSINESS APPLICATION</h1>
  <form @submit.prevent="submit">
    <input type="text" id="date" name="date" placeholder="Date Submitted (DD/MM/YYYY)">
    <input type="text" id="location" name="location" placeholder="Location">
    <input type="text" id="phyDec" name="phyDec" placeholder="Physical Declaration Number">
    <input type="text" id="fillDate" name="fillDate" placeholder="Phy. Declaration # Filing Deadline Date">
    <input type="text" id="econDecNum" name="econDecNum" placeholder="Economic Injury Declaration Number">
    <input type="text" id="fillDate" name="fillDate" placeholder="Econ. Injury # Filing Deadline Date">
    <input type="text" id="sbaNum" name="sbaNum" placeholder="SBA Application Number">
    <button class="snip1582" type="submit">Next Page</button> 
  </form>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  submit() {
    console.log('submitted!');
    this.$router.push('/v2Apply');
  }
}
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Varela+Round);
.snip1582 {
  background-color: #4aa4f7;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: 'BenchNine', Arial, sans-serif;
  font-size: 1em;
  font-size: 22px;
  line-height: 1em;
  margin: 15px 40px;
  outline: none;
  padding: 12px 40px 10px;
  position: relative;
  text-transform: uppercase;
  font-weight: 700;
}

.snip1582:before,
.snip1582:after {
  border-color: transparent;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
  border-style: solid;
  border-width: 0;
  content: "";
  height: 24px;
  position: absolute;
  width: 24px;
}

.snip1582:before {
  border-color: #4aa4f7;
  border-top-width: 2px;
  left: 0px;
  top: -5px;
}

.snip1582:after {
  border-bottom-width: 2px;
  border-color: #4aa4f7;
  bottom: -5px;
  right: 0px;
}

.snip1582:hover,
.snip1582.hover {
  background-color: #4aa4f7;
}

.snip1582:hover:before,
.snip1582.hover:before,
.snip1582:hover:after,
.snip1582.hover:after {
  height: 100%;
  width: 100%;
}
</style>
