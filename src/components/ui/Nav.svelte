<script>
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Button,
        Input,
    } from "flowbite-svelte";
    import Menu from "./Menu.svelte";
</script>

<Navbar let:hidden let:toggle class="shadow-xl mb-10">
    <NavBrand href="/">
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >
            Auth0
        </span>
    </NavBrand>
    <div class="flex md:order-2">
        <Menu />
        <NavHamburger on:click={toggle} />
    </div>
    <NavUl {hidden} class="order-1">
        <NavLi href="/" active={true}>Home</NavLi>
        <NavLi href="/about">About</NavLi>
        <NavLi href="/services">Services</NavLi>
        <NavLi href="/pricing">Pricing</NavLi>
        <NavLi href="/contact">Contact</NavLi>
    </NavUl>
</Navbar>
