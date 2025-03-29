<script>

    let { children, data } = $props();
    let { user } = data;
</script>

<div class="">
    <p class="text-gray-500 mb-4">You are logged in as, 
        <span class="font-bold">{user.name}</span>
    </p>
    <p>
        <a href="/app/logout">Logout</a>
    </p>
    {@render children()}
</div>
