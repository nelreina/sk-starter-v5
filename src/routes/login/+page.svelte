<script>
    import { enhance } from '$app/forms';

    let { form } = $props();
</script>
<a href="/">Go back</a>


<form method="post" action="/login" use:enhance>
    <input type="text" name="email" placeholder="Username or Email" />
    <input type="password" name="password" placeholder="Password" />
    <button type="submit">Login</button>
</form>

{#if form?.error}
    <p>{form.error}</p>
{/if}

