<template>
    <div>
        <div class="columns">
  <div class="column">
    First column
  </div>
  <div class="column">
    Second column
  </div>
  <div class="column">
    Third column
  </div>
  <div class="column">
    Fourth column
  </div>
</div>
        <img src="https://via.placeholder.com/150 "  @click="isImageModalActive = true" alt="" class="modal-pic">
        <button class="button is-primary is-medium">
           
            Launch image modal
        </button>
         <b-modal :active.sync="isImageModalActive">
            <p class="image is-4by3">
                <img src="https://via.placeholder.com/250">
            </p>
        </b-modal>
        <section>
            <button class="button is-medium" @click="snackbar">
                Launch snackbar (default)
            </button>
    
            <button class="button is-medium is-warning" @click="warning">
                Launch snackbar (custom)
            </button>
    
            <button class="button is-medium is-danger" @click="danger">
                Launch snackbar (custom)
            </button>
        </section>
    </div>
</template>

<script>
    export default {
         data() {
            return {
                isImageModalActive: false,
                isCardModalActive: false
            }
        },
        methods: {
            snackbar() {
                this.$snackbar.open(`Default, positioned bottom-right with a green 'OK' button`)
            },
            warning() {
                this.$snackbar.open({
                    message: 'Yellow button and positioned on top, click to close',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true,
                    onAction: () => {
                        this.$toast.open({
                            message: 'Action pressed',
                            queue: false
                        })
                    }
                })
            },
            danger() {
                this.$snackbar.open({
                    duration: 5000,
                    message: 'Snackbar with red action, positioned on bottom-left and a callback',
                    type: 'is-danger',
                    position: 'is-bottom-left',
                    actionText: 'Undo',
                    queue: false,
                    onAction: () => {
                        this.$toast.open({
                            message: 'Action pressed',
                            queue: false
                        })
                    }
                })
            }
        }
    }
</script>
<style>
.modal-pic {
    cursor: pointer;
}
</style>

