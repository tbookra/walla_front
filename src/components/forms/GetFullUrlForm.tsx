"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import CustomInputWrapper from "../CustomInputWrapper";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";

interface FormData {
  shortUrl: string;
}
interface Props {
  setResults: Dispatch<SetStateAction<string>>;
}
const Schema: ZodType<FormData> = z
  .object({
    shortUrl: z
      .string()
      .length(7, { message: "short url must contain 7 characters" }),
  })
  .required();

const BASE_URL = "http://localhost:4000";

const GetFullUrlForm = ({ setResults }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: {
      shortUrl: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    console.log("formData", formData);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/get_full_url/${formData.shortUrl}`
      );
      setResults(data.url);
      console.log("data", data);
    } catch {
      setResults("not found");
    }
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputWrapper label="Full URL" errorMessage={errors.shortUrl}>
        <input
          type="text"
          id="Full URL"
          {...register("shortUrl")}
          aria-invalid={errors.shortUrl ? "true" : "false"}
          className="input"
        />
      </CustomInputWrapper>
      <button type="submit" className="button">
        Send
      </button>
    </form>
  );
};

export default GetFullUrlForm;
