<script setup>
    import Multiselect from '@vueform/multiselect'
    const props = defineProps({
        record: Object,
        actionType: String
    })    

    
    let formData = ref(props.record);
    const emit = defineEmits(['formManaged'])
    
    const fruitsRaw = await useFecthFruits();
    const fruits = fruitsRaw.data;
    const fruitsMultiselectOptions = fruits.value.map((item) => {
        return {
            value: item.id,
            label: item.name,
        }
    })
    let multiselect1Options = formData.value.multiselect1.length !== 0 ? formData.value.multiselect1.split(',') : [];
    let multiselect2Options = formData.value.multiselect2.length !== 0 ? formData.value.multiselect2.split(',') : [];
    let simpleselectValue = formData.value.simpleselect;


    const onSelect = (option) => {
        let fruitsArray = [];
        fruitsMultiselectOptions.map(item => {
            fruitsArray.push(item.value)
        })
        console.log("======", fruitsArray)
        console.log("======", option)
      if (fruitsArray.find(option)) {
        // live:.cid.beb7f5ecbf8ece23
      }
    }

    async function handleSubmit() {
        formData.value.multiselect1 = multiselect1Options.join(',');
        formData.value.multiselect2 = multiselect2Options.join(',');
        formData.value.simpleselectValue = simpleselectValue;

        const { error, data } = await useFetch(`/api/record`,
            {
                method: "post",
                body: formData.value,
            }
        );

        emit('formManaged', true);

        console.log({ error, data });

    }    

</script>

<template>
    
    <div v-if="props.actionType != 'none'">
        <h1>{{ props.actionType }}</h1>
        <form class="form" @submit.prevent="handleSubmit()">
            <input type="hidden" v-model="formData.id">
            <div class="fv-row mb-7">
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required">Name</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Name of the value set"></i>
                </label>
                <input type="text" class="form-control" placeholder="input name" v-model="formData.name" />
            </div>

            <div class="fv-row mb-7">
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required">Input</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Name of the value set"></i>
                </label>
                <input type="text" class="form-control" v-model="formData.comment" />
            </div>

            <div class="fv-row mb-7">
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required">Multiselect searchage - id 1</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Multiselect 1"></i>
                </label>
                <div class="fv-row mb-7">
                    <Multiselect
                        v-model="multiselect1Options"
                        :attrs="{ id }"
                        mode="tags"
                        :searchable="true"
                        :create-tag="true"
                        :options="fruitsMultiselectOptions"
                        placeholder="Add tags"
                        :createTag="false"
                    />
                </div>
            </div>

            <div class="fv-row mb-7">
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required">Multiselect searchage - id 2</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Multiselect 2"></i>
                </label>
                <div class="fv-row mb-7">
                    <Multiselect
                        v-model="multiselect2Options"
                        :attrs="{ id }"
                        mode="tags"
                        :searchable="true"
                        :create-tag="true"
                        :options="fruitsMultiselectOptions"
                        placeholder="Add tags"
                    />
                </div>
            </div>

            <div class="fv-row mb-7">
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required">Simple select</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Name of the value set"></i>
                </label>
                <div class="fv-row mb-7">
                    <Multiselect
                        v-model="formData.simpleselectValue"
                        :attrs="{ id }"
                        mode="single"
                        :searchable="true"
                        :create-tag="true"
                        :options="fruitsMultiselectOptions"
                        placeholder="Add tags"
                        :multiple="false"
                    />
                </div>
            </div>

            <div class="d-flex justify-content-end">
                <button type="reset" data-kt-contacts-type="cancel" class="btn btn-light me-3">Cancel</button>
                <button type="submit" data-kt-contacts-type="submit" class="btn btn-primary">
                    <span class="indicator-label" @click.prevent="handleSubmit()">Save</span>
                    <span class="indicator-progress">Please wait...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                </button>
            </div>
        </form>
    </div>

</template>
<style src="@vueform/multiselect/themes/default.css" >
</style>
<!-- <style scoped>
.multiselect-tags .multiselect-tags-search {
    background: red !important;
}
</style> -->


