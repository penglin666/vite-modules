<template>
  <div>
    <div>{{ params }}</div>
    <SearchForm :schema="schema" v-model:params="params" />
  </div>
</template>

<script setup>
import SearchForm from "../../../../components/SearchForm.vue";
import { onMounted, ref, watch } from "vue";
import { getOptionsApi } from "../../apis/user";
const params = ref({});
const schema = [
  {
    label: "输入框",
    field: "name",
    component: "Input",
    componentProps: {
      allowClear: true,
      placeholder: "请输入关键字",
      style: {
        width: "150px",
      },
    },
    formItemProps: {
      // rules: [
      //   {
      //     required: true,
      //     message: "请输入姓名",
      //     trigger: "blur",
      //   },
      // ],
    },
    // value: 123,
  },
  {
    label: "下拉框",
    field: "country",
    component: "Select",
    componentProps: {
      allowClear: true,
      placeholder: "请选择国家",
      options: async () => {
        const { data } = await getOptionsApi({});
        return data.data;
      },
      // options: [
      //   { value: 1, label: "足球" },
      //   { value: 2, label: "篮球" },
      //   { value: 3, label: "排球" },
      // ],
    },
    style: {
      width: "150px",
    },
    // value: 3,
  },
  {
    label: "日期",
    field: "birthday",
    component: "DatePicker",
    componentProps: {
      // format: "YYYY-MM-DD",
    },
    formItemProps: {
      // rules: [
      //   {
      //     required: true,
      //     message: "生日日期不能为空",
      //     trigger: "blur",
      //   },
      // ],
    },
    value: () => "2024-12-12",
  },
  {
    label: "日期范围",
    field: "['startDate','endDate']",
    component: "RangePicker",
    formItemProps: {
      // rules: [
      //   {
      //     required: true,
      //     message: "生日日期不能为空",
      //     trigger: "blur",
      //   },
      // ],
    },
    // value: ["2024-11-13", "2024-11-13"],
  },
];
onMounted(() => {
  getList();
});
const getList = () => {
  // console.log(searchRef.value.getParams(), "data");
};
</script>
