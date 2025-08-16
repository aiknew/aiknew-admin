<script lang="ts" setup></script>

<template>
  <div class="app-form-item-container">
    <div class="top-slot">
      <slot name="top"></slot>
    </div>

    <div class="content-wrapper">
      <div class="left-slot">
        <slot name="left"></slot>
      </div>
      <div class="w-full flex-auto">
        <slot></slot>
      </div>
      <div class="right-slot">
        <slot name="right"></slot>
      </div>
    </div>

    <div class="bottom-slot">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<style>
.el-input-number {
  max-width: 100%;
}
</style>

<style lang="scss">
.app-form-item-container {
  width: 100%;
  display: flex;
  flex-direction: column;

  .top-slot {
    width: 100%;
  }

  .content-wrapper {
    display: flex;
    align-items: center;
  }

  .bottom-slot {
    width: 100%;
  }
}
</style>
