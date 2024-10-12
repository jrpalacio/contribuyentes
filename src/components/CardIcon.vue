<template>
  <article class="card">
    <header class="card--header">
      <div class="card--icon">
        <slot name="icono"></slot>
      </div>
      <div>
        <h4>
          <slot name="titulo"></slot>
        </h4>
        <p><slot name="descripcion"></slot></p>
      </div>
    </header>
    <slot name="boton"></slot>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.7rem;
}
.card--header {
  display: flex;
  gap: 0.8rem;
  flex-direction: row;
  align-items: center;
}
.card--icon {
  border: 1px solid #e0e0e0;
  border-radius: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
}
</style>
