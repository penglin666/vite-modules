<template>
  <a-form :model="formModel" v-bind="$attrs" layout="inline">
    <a-form-item
      :name="item.field"
      :label="item.label"
      v-for="item in formSchema"
      :key="item.field"
      v-bind="item.formItemProps"
    >
      <component
        :is="componentsMap[item.component]"
        v-bind="item.componentProps"
        v-model:value="formModel[item.field]"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="submit">查询</a-button>
        <a-button @click="reset">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, onMounted, shallowReactive, watch } from "vue";
import {
  Input,
  Textarea,
  InputNumber,
  Select,
  RadioGroup,
  CheckboxGroup,
  DatePicker,
  RangePicker,
} from "ant-design-vue";
import dayjs from "dayjs";

const props = defineProps({
  // 表单项配置
  schema: {
    type: Array,
    default: () => [],
  },
  // 表单参数
  params: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:params"]);

const formRef = ref(null);

const formSchema = ref([]);
const formModel = ref({});
const componentsMap = shallowReactive({
  Input,
  Textarea,
  Number: InputNumber,
  Select,
  Radio: RadioGroup,
  Checkbox: CheckboxGroup,
  DatePicker,
  RangePicker,
});

// 初始化表单
const initForm = () => {
  formSchema.value = props.schema.map((item) => {
    // console.log(getComponentProps(item), "item");
    // getComponentProps(item)
    return getComponentProps(item);
  });
  getSyncOptions();
};
const getComponentProps = (schema) => {
  if (!schema?.componentProps) schema.componentProps = {};
  // 使得外层可以直接配置options
  if (
    schema?.componentProps.hasOwnProperty("options") &&
    schema?.componentProps.options
  ) {
    // schema.componentProps.options = [];
    const isFunction = typeof schema.componentProps.options === "function";
    const isArray = Array.isArray(schema.componentProps.options);
    if (isFunction || isArray) {
      // 函数时先赋值空数组
      //  const options= [
      //   { value: 1, label: "足球" },
      //   { value: 2, label: "篮球" },
      //   { value: 3, label: "排球" },
      // ];
      schema.componentProps.options = isFunction ? [] : schema.options;
    }
  }
  return {
    // placeholder: x?.componentProps?.placeholder ?? getPlaceholder(x),
    // ...(defaultComponentProps[x.component] || {}), // config.js带过来的基础componentProps默认配置
    // ...(props.componentProps[x.component] || {}), // props传进来的组件componentProps配置
    ...schema, // 组件自身的componentProps
  };
};
// 设置初始表单值
const setFormValue = () => {
  formModel.value = props.schema.reduce((pre, cur) => {
    if (!pre[cur.field]) {
      if (cur.component === "RangePicker") {
        //多个日期处理回显处理
        if (cur.value && cur.value.length) {
          pre[cur.field] = cur.value.map((item) => dayjs(item));
        }
      } else if (cur.component === "DatePicker") {
        // 单个日期回显处理
        if (cur.value) {
          pre[cur.field] = dayjs(cur.value);
        }
      } else {
        pre[cur.field] = cur.value;
      }
      return pre;
    }
  }, {});

};
// 获取异步options数据
const getSyncOptions = () => {
  formSchema.value.forEach(async (item) => {
    console.log(item,'itm')
    if (
      item.componentProps.options &&
      typeof item.componentProps.options === "array"
    ) {
      console.log(item, "itm");
      // item.loading = true;
      item.componentProps.options = await item.componentProps.options();
      // item.loading = false;
      console.log(item, "itemhjkl");
    }
  });
};
onMounted(() => {
  initForm();
  setFormValue();
  // getSyncOptions();
});
watch(
  formModel,
  () => {
    const formData = JSON.parse(JSON.stringify(formModel.value));
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/; // 日期判断正则
    for (const [key, value] of Object.entries(formData)) {
      if (key.charAt(0) === "[" && key.charAt(key.length - 1) === "]") {
        const arr = eval(key);
        for (let i = 0; i < arr.length; i++) {
          if (value) {
            formData[arr[i]] = value[i];
          }
        }
        delete formData[key];
      }
    }
    // 统一处理参数&处理日期格式为YYYY-MM-DD
    for (let key in formData) {
      if (!formData[key]) {
        delete formData[key];
      } else {
        if (regex.test(formData[key])) {
          formData[key] = dayjs(formData[key]).format("YYYY-MM-DD");
        }
      }
    }
    // return formData;
    emit("update:params", formData);
  },
  { deep: true, immediate: true }
);
const submit = () => {
  // emit("update:params",getParams());
};
const reset = () => {
  formModel.value = {};
  submit();
};
</script>
