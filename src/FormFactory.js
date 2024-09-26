import { Button, Grid2, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const FormFactory = ({ formConfigs, onSubmit }) => {
    const formMethods = useForm();
    const { setValue, watch } = formMethods;

    const handleSubmit = (data) => {
        onSubmit(data);
    };

    const RenderField = (field, methods) => {
        const fieldValue = watch(field.name);
        const { register } = methods

        useEffect(() => {
            if (field.type === 'custom') {
                register(field.name, field.validation);
            }
        }, [register, field.name, field.validation, field.type]);

        switch (field.type) {
            case 'select':
                return (
                    <Select {...register(field.name, field.validation)}>
                        <MenuItem value="">Select...</MenuItem>
                        {field.options.map((option, idx) => (
                            <MenuItem key={idx} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                );
            case 'custom':
                const CustomComponent = field.component;
                return (
                    <CustomComponent
                        value={fieldValue}
                        onChange={(value) => setValue(field.name, value)}
                    />
                );
            case 'text':
                return (
                    <TextField
                        {...register(field.name, field.validation)}
                        type={field.type || 'text'}
                    />
                );
            default:
                return (
                    <TextField
                        {...register(field.name, field.validation)}
                        type={field.type || 'text'}
                    />
                );
        }
    };

    return (
        <FormProvider {...formMethods} >

            <Grid2 container direction={'column'}>
                {formConfigs.map((config, index) => (
                    <Grid2 direction={'column'}>
                        <Typography variant="h6"> {config.title}</Typography>
                        {
                            config.fields.map((field, idx) => (
                                <Grid2>
                                    <Stack>
                                        <Typography>{field.label}</Typography>
                                        {RenderField(field, formMethods)}
                                        {formMethods.formState.errors[field.name] && (
                                            <span style={{ color: 'red' }}>
                                                {formMethods.formState.errors[field.name].message}
                                            </span>
                                        )}
                                    </Stack>

                                </Grid2>
                            ))
                        }
                    </Grid2>
                ))}
            </Grid2>


            <Button onClick={formMethods.handleSubmit(handleSubmit)} type="submit">Submit All Forms</Button>
        </FormProvider>
    );
};

export default FormFactory;
