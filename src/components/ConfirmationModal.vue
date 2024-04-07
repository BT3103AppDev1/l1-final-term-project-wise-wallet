<template>
    <div class="modal-background" v-if="isVisible">
      <div class="modal">
        <p>{{ message }}</p>
        <button class="confirm-btn" @click="confirm">Confirm</button>
        <button class="cancel-btn" @click="cancel">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['isVisible', 'message'],
    methods: {
      confirm() {
        this.$emit('confirm');
      },
      cancel() {
        this.$emit('cancel');
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  
  .confirm-btn {
    background-color: red;
    color: white;
    border: none;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
  }
  
  .cancel-btn {
    background-color: grey;
    color: white;
    border: none;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
  }
  </style>
  