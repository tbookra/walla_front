"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import CustomInputWrapper from "../CustomInputWrapper";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";

interface FormData {
  fullUrl: string ;
}
interface Props {
  setResults: Dispatch<SetStateAction<string>>;
}
const Schema: ZodType<FormData> = z
  .object({
    fullUrl: z.string().url({ message: "Invalid URL" }),
  })
  .required();

const BASE_URL = "http://localhost:4000";

const GetShortUrlForm = ({ setResults }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: {
      fullUrl: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    
    try{
      const { data } = await axios.get(
        `${BASE_URL}/get_short_url/${formData.fullUrl.split("://")[0]}/${formData.fullUrl.split("://")[1]}`
      );
      setResults(data.shortUrl)
    } catch {
      setResults("not found")
    }
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputWrapper label="Full URL" errorMessage={errors.fullUrl}>
        <input
          type="text"
          id="Full URL"
          {...register("fullUrl")}
          aria-invalid={errors.fullUrl ? "true" : "false"}
          className="input"
        />
      </CustomInputWrapper>
      <button type="submit" className="button">
        Send
      </button>
    </form>
  );
};

export default GetShortUrlForm;
