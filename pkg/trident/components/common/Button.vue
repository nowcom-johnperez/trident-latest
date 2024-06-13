<template>
    <button @click="onClick">
        <slot>{{ label }}</slot>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        label: {
            type: String,
            default: ""
        },
    },
    methods: {
        onClick () {
            this.$emit('click')
        }
    }
}
</script>

<style scoped>
.custom-button {
  background-color: #297db4;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  /* Add this line for vertical alignment if needed */
  width: 70px;
  margin-right: 10px;
}

.custom-button:hover {
  background-color: #0056b3;
}

.disable-hover:hover {
  background-color: #007bff;
  /* Change this to the non-hover background color */
  cursor: not-allowed;
}

.close-button {
  position: absolute;
  top: 60px;
  right: 10px;
  border: none;
  font-size: 12px;
  cursor: pointer;
  color: #f90c0c;
  /* Set a default color */
}

.delete-button {
  background-color: #ff001e;
  color: #fff;
  border: none;
  padding: 5px 15px;
  /* Adjust padding */
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  /* Add margin for spacing */
}

.row-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
}

.row-button:disabled {
  background-color: #cccccc;
  /* Grey */
  color: #666666;
  /* Dark grey */
  cursor: not-allowed;
}

.close-subnet-button {
  position: absolute;
  top: 60px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #25bbb4;
}

.list-delete-button {
  background-color: #ff001e;
  color: #fff;
  border: none;
  padding: 0 2px;
  /* Adjust top and bottom padding */
  border-radius: 2px;
  cursor: pointer;
  font-size: 10px;
}

.ok-button {
  background-color: #3b7498;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.feature-request-btn {
  /* height: 100px;
  width: 245px; */
  /* font-size: 2em; */
  white-space: normal;
}
</style>