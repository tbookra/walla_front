"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import CustomInputWrapper from "../CustomInputWrapper";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";

interface FormData {
  url: string | FieldError;
}
interface Props {
  setResults: Dispatch<SetStateAction>;
}
const Schema: ZodType<FormData> = z
  .object({
    url: z.string().url({ message: "Invalid URL" }),
  })
  .required();

const BASE_URL = "http://localhost:4000";

const UrlsForm = ({ setResults }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const { data } = await axios.post(BASE_URL, formData);
    console.log("res", data);
    if (data.error) {
      setUniqueString(data?.error);
    } else {
      setUniqueString(data?.shortUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputWrapper label="URL" errorMessage={errors.url}>
        <input
          type="text"
          id="URL"
          {...register("url")}
          aria-invalid={errors.url ? "true" : "false"}
          className="input"
        />
      </CustomInputWrapper>
      <button type="submit" className="button">
        Send
      </button>
    </form>
  );
};

export default UrlsForm;
