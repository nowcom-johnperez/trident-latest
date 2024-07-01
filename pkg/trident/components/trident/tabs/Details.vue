<template>
  <div>
    <div class="card">
      <div class="overview-header">
        <h3>Details</h3>

        <div class="overview-header-right">
          <VTooltip v-if="!editMode" :distance="15">
            <cButton class="overview-right-btn" @click="setEditMode">
              <i class="fa fa-pencil fa-lg"></i>
            </cButton>
            <template #popper>
              Edit
            </template>
          </VTooltip>
        </div>
      </div>
      
      <div v-if="details" class="mt-20 full-width">
        <div class="row">
          <div class="col span-6">
            <DisplayValue label="Identifier" value="test" />
          </div>

          <div class="col span-6">
            <DisplayValue label="Title" :value="details.title" />
          </div>
        </div>

        <div class="row mt-20">
          <div class="col span-6">
            <DisplayValue label="Team" :value="details.team" :editable="editMode" @input="handleUpdate" />
          </div>

          <div class="col span-6">
            <DisplayValue label="Last Update" value="a month ago" />
          </div>
        </div>
        
        <div class="row mt-20">
          <div class="col span-6">
            <DisplayValue label="IP" :value="details.ip" />
          </div>

          <div class="col span-6">
            <DisplayValue label="Health Check" value="" :editable="editMode" icon="fa-dot-circle-o" @input="handleUpdate" />
          </div>
        </div>
        
        <div class="row mt-20">
          <div class="col span-6">
            <DisplayValue label="Rancher" value="" icon="fa-dot-circle-o" />
          </div>

          <div class="col span-6">
            <DisplayValue label="Repo Branch" value="" :editable="editMode" icon="fa-github" @input="handleUpdate" />
          </div>
        </div>
        
        <div class="row mt-20">
          <div class="col span-6">
            <DisplayValue label="Description" :value="details.description" :editable="editMode" icon="fa-dot-circle-o" @input="handleUpdate" />
          </div>
        </div>

        <div v-if="editMode" class="row mt-20">
          <div class="col span-12">
            <cButton class="btn-light mr-10" @click="editMode = false">
              <i class="fa fa-cancel fa-lg"></i> Cancel
            </cButton>

            <cButton class="btn-primary" @click="saveUpdate">
              Save
            </cButton>
          </div>
        </div>
      </div>
    </div>

    <div v-if="false" class="card mt-30">
      <h3>Related Entities</h3>
      <div class="mt-20">
        <div class="row">
          <div class="col span-12 text-center">
            <p class="" style="font-size: 2rem">There are no related entities found.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cButton from '../../common/Button'
  import DisplayValue from '../../common/DisplayValue.vue'
  export default {
    name: 'DetailsOverview',
    components: {
      DisplayValue,
      cButton
    },
    props: {
      details: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        editMode: false,
        temp: {
          team: '',
          healthCheck: '',
          description: this.details.description,
          repoBranch: ''
        }
      }
    },
    methods: {
      setEditMode() {
        this.editMode = true
      },
      handleUpdate(obj) {
        switch(obj.label) {
          case 'Description':
            this.temp.description = obj.value
            break;
          case 'Repo Branch':
            this.temp.repoBranch = obj.value
            break;
          case 'Team':
            this.temp.team = obj.value
            break;
          case 'Health Check':
            this.temp.healthCheck = obj.value
            break;
          default:
            // do nothing
            break;
        }

        console.log(`temp update`, this.temp)
      },
      resetTemp () {
        // update values from api response
        this.temp = {
          team: '',
          healthCheck: '',
          description: this.details.description,
          repoBranch: ''
        }
      },
      saveUpdate() {
        console.log(`temp update`, this.temp)
        this.editMode = false
        this.resetTemp()
      }
    }
  }
</script>

<style lang="scss" scoped>
.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .overview-right-btn {
    background: transparent;
  }

  .overview-right-btn:hover {
    background-color: #979595;
  }
}
</style>