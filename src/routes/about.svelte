<script>
  import * as BABYLON from 'babylonjs';
  import { onMount } from 'svelte';
  import { createScene } from "$lib/scene";
  let el;
  onMount(() => {
    createScene(el)
  });
</script>
<form id="sign">
      <input id="alias" placeholder="username">
      <input id="pass" type="password" placeholder="passphrase">
      <input id="in" type="submit" value="sign in">
      <input id="up" type="button" value="sign up">
    </form>

    <ul></ul>

    <form id="said">
        <input id="say">
        <input id="speak" type="submit" value="speak">
</form>
<canvas bind:this={el}></canvas>