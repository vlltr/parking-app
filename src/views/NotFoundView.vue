<template>
    <div class="flex flex-col mx-auto md:w-96 w-full">
        <h1 class="text-2xl font-bold mb-4 text-center">404 Not Found</h1>
        <RouterLink :to="{ name: 'vehicles.index' }" class="btn btn-secondary">
            Back to home
        </RouterLink>
    </div>
</template>