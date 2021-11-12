import yup from "yup";

export const CalculateIn = yup.object().shape({
    from: yup.string().required(),
    to: yup.string().required(),
    amount: yup.number().required()
});
