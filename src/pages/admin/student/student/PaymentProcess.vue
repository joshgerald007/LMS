<template>
  <div class="q-pb-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Manage Course" />
      <q-breadcrumbs-el label="Payment" />
      <q-breadcrumbs-el label="Student Payment" />
    </q-breadcrumbs>
  </div>
  <q-card bordered no-shadow class="q-mb-md" style="box-shadow: none" v-if="route.params.id">
    <q-card-section class="row q-pb-lg q-pt-lg">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="text-subtitle1 q-px-md">
          <div class="q-pb-sm text-weight-medium">Student Details:</div>
          <div class="row">
            <div class="col-4">
              First Name:<br />
              Last Name:<br />
              Email:
            </div>
            <div class="col-4">
              {{ student?.data?.result?.first_name || '--' }}<br />
              {{ student?.data?.result?.last_name || '--' }}<br />
              {{ student?.data?.result?.email || '--' }}
            </div>
          </div>
          <div class="row">
            <div class="col-8 q-mt-sm">
              <q-btn
                @click="editModal = true"
                label="Edit"
                color="warning text-black"
                class="q-mr-md"
                size="sm"
                icon="edit_square"
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <div class="row q-col-gutter-lg">
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-card bordered class="no-shadow card_style fit">
        <q-card-section class="q-pt-xs">
          <q-card-section class="q-pa-none">
            <q-card-section class="text-h6">Form Payment</q-card-section>
            <q-card-section class="q-pt-none">
              <q-select
                class="q-mb-md"
                outlined
                v-model="added_bill"
                multiple
                :options="addbill"
                label="Added Bills"
                emit-value
                map-options
              />
              <q-select
                class="q-mb-md"
                outlined
                v-model="other_payment"
                multiple
                :options="otherpayment"
                label="Other Payments"
              />
              <hr />
              <q-select
                class="q-mb-md"
                outlined
                v-model="subsidy1"
                multiple
                :options="subsidy"
                label="Subsidy"
              />
              <q-input
                class="q-mb-md"
                outlined
                v-model="reference_number"
                label="Reference Number"
              />
              <q-input class="q-mb-md" outlined v-model="or_number" label="OR Number" />
              <q-select
                class="q-mb-md"
                outlined
                v-model="subsidy2"
                multiple
                :options="subsidy"
                label="Subsidy"
              />
              <q-input outlined v-model="amount" label="Amount" type="number" />
            </q-card-section>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-card bordered class="no-shadow card_style fit">
        <q-card-section class="q-pt-xs">
          <q-card-section class="q-pa-none">
            <q-card-section class="text-h6">Total Payment</q-card-section>
            <q-card-section class="q-pt-none">
              <q-card bordered class="no-shadow card_style fit q-mb-md">
                <q-card-section class="q-pa-none">
                  <q-card-section>Total Units</q-card-section>
                  <q-card-section class="q-pt-none" v-if="StudentSchedule.length > 0">
                    <q-list dense>
                      <q-item v-for="x in StudentSchedule" :key="x">
                        <q-item-section>
                          {{ x.subject_schedule.subject.name }}
                        </q-item-section>
                        <q-item-section side>
                          ({{ x.subject_schedule.subject.units }} Units)
                          {{
                            numberFormat(
                              Number(x.subject_schedule.subject.price_per_unit) *
                                Number(x.subject_schedule.subject.units),
                            )
                          }}
                        </q-item-section>
                      </q-item>
                      <hr />
                      <q-item>
                        <q-item-section> Total </q-item-section>
                        <q-item-section side>
                          ({{
                            StudentSchedule.map((x) =>
                              Number(x.subject_schedule.subject.units),
                            ).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                          }}
                          Units)
                          {{
                            numberFormat(
                              StudentSchedule.map(
                                (x) =>
                                  Number(x.subject_schedule.subject.price_per_unit) *
                                  Number(x.subject_schedule.subject.units),
                              ).reduce(
                                (accumulator, currentValue) => accumulator + currentValue,
                                0,
                              ),
                            )
                          }}
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section class="q-pt-none" v-else>
                    <q-list dense class="text-center text-grey">
                      Student do not have a schedule yet
                    </q-list>
                  </q-card-section>
                </q-card-section>
              </q-card>

              <q-card bordered class="no-shadow card_style fit q-mb-md">
                <q-card-section class="q-pa-none">
                  <q-card-section>Added Bills</q-card-section>
                  <q-card-section class="q-pt-none" v-if="added_bill.length > 0">
                    <q-list dense>
                      <q-item v-for="x in added_bill" :key="x">
                        <q-item-section>
                          {{ addbill.find((y) => y.value === x).label }}
                        </q-item-section>
                        <q-item-section side> ₱100 </q-item-section>
                      </q-item>
                      <hr />
                      <q-item>
                        <q-item-section> Total </q-item-section>
                        <q-item-section side> ₱{{ added_bill.length * 100 }} </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section class="q-pt-none" v-else>
                    <q-list dense class="text-center text-grey"> Select added bills </q-list>
                  </q-card-section>
                </q-card-section>
              </q-card>

              <q-card bordered class="no-shadow card_style fit q-mb-md">
                <q-card-section class="q-pa-none">
                  <q-card-section>Other Payments</q-card-section>
                  <q-card-section class="q-pt-none" v-if="other_payment.length > 0">
                    <q-list dense>
                      <q-item v-for="x in other_payment" :key="x">
                        <q-item-section>
                          {{ addbill.find((y) => y.value === x).label }}
                        </q-item-section>
                        <q-item-section side> ₱100 </q-item-section>
                      </q-item>
                      <hr />
                      <q-item>
                        <q-item-section> Total </q-item-section>
                        <q-item-section side> ₱{{ other_payment.length * 100 }} </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section class="q-pt-none" v-else>
                    <q-list dense class="text-center text-grey"> Select other payment </q-list>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </q-card-section>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { collection, show, list } from 'boot/get.js'

function numberFormat(n) {
  return `₱ ${Number(n).toLocaleString('en', {
    minimumFractionDigits: 2,
  })}`
}

const route = useRoute()

const editModal = ref(false)

const student = ref({})
const addbill = ref([])
const otherpayment = ref([])
const subsidy = ref([])
const StudentSchedule = ref([])

const added_bill = ref([])
const other_payment = ref([])
const subsidy1 = ref([])
const reference_number = ref('')
const or_number = ref('')
const subsidy2 = ref([])
const amount = ref('')

async function getStudentDetails() {
  let result
  result = await show('student', route.params.id)
  student.value = result
}

async function getAddedBills() {
  const f = await collection('finance/added-bills')
  const result = f?.data?.result
  if (result) {
    addbill.value = result.map((x) => {
      console.log(x)
      return { label: x.name, value: x.id }
    })
  }
}

async function getOtherPayments() {
  const f = await collection('finance/other-payments')
  const result = f?.data?.result
  if (result) {
    otherpayment.value = result.map((x) => {
      console.log(x)
      return { label: x.name, value: x.id }
    })
  }
}

async function getSubsidy() {
  const f = await collection('student/subsidy')
  const result = f?.data?.result
  if (result) {
    subsidy.value = result.map((x) => {
      console.log(x)
      return { label: x.name, value: x.id }
    })
  }
}

async function getStudentSubject() {
  const f = await list(`student-schedule/student/${route.params.id}`)
  StudentSchedule.value = f?.data?.result?.data || []
}

onMounted(() => {
  if (route.params.id) {
    getStudentDetails()
    getAddedBills()
    getOtherPayments()
    getSubsidy()
    getStudentSubject()
  }
})
</script>
