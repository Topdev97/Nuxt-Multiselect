<script setup>

    const recordsRaw = await useFetchRecords();
    const records = recordsRaw.data;

    const noRecord = {
        id:0,
        name:'',
        comment:null,
        multiselect1:[],
        multiselect2:[],
        simpleselect:''
    };

    let currentRecord = reactive(noRecord);

    // Function to handle action changes
    let actionType = ref('none');

    function formManaged(e) {
        actionType.value = 'none';
        console.log('input received', e);
    }

    function actionAdd() {
        currentRecord = noRecord;
        actionType.value = 'add';
    }  

    function actionEdit(record) {
        currentRecord = record;
        console.log('currentRecord', currentRecord.id)
        actionType.value = 'edit '+currentRecord.id;
    }    

</script>

<template>
    <div class="row g-6 g-xxl-12">
        <div class="col-xl-6" >
            <Card>

                <div class="card-header">
                    <!--begin::Card title-->
                    <h3 class="card-title fw-bold mb-1">
                        List of entity
                    </h3>
                    <div class="card-toolbar">
                        <button type="button" class="btn btn-sm btn-light" @click="actionAdd()">Add</button>
                    </div>
                </div>

                    <div class="d-flex flex-stack" v-for="record in records" :key="record.id">              
                        <!--begin::Symbol-->
                        <div class="symbol symbol-40px me-5"> 
                            {{ record.id }}
                        </div>
                        <!--end::Symbol-->
                        <!--begin::Section-->
                        <div class="d-flex align-items-center flex-row-fluid flex-wrap">
                            <!--begin:Author-->
                                <div class="flex-grow-1 me-2">
                                    <span class="text-gray-800 text-hover-primary fs-6 fw-bold">{{ record.name }}</span>
                                </div>
                            <!--end:Author-->
                            <!--begin:Action-->
                                <button class="btn btn-sm btn-light fs-8 fw-bold" @click="actionEdit(record)">Edit</button>
                            <!--end:Action-->
                        </div>
                        <!--end::Section-->
                    </div>

            </Card>
        </div>


        <div class="col-xl-6" >
            <Card>
                <h1>Form</h1>

                <Form
                    @form-managed="formManaged"
                    :record="currentRecord"
                    :actionType="actionType"
                    :key="actionType"
                />

            </Card>
        </div>
    </div>
    
</template>