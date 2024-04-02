import { Task } from "@/constant/reduxApi";
import { apiSlice } from "./apiSlice";

type TaskResponese = {
  message: string;
  success: boolean;
  data?: any;
};

type TaskData = {
  _id?: string;
  title: string;
  description: string;
  maintainceDate: string;
  dueDate: string;
  days: number;
};

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<TaskResponese, TaskData>({
      query: (data) => ({
        url: `/${Task}`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     if (data) {
      //       dispatch(taskAdd(data));
      //     }
      //   } catch (err) {
      //     console.log(err);
      //   }
      // },
      invalidatesTags: ["Task"],
    }),
    updateTaskById: builder.mutation<TaskResponese, TaskData>({
      query: (data) => ({
        url: `/${Task}/${data._id}`,
        method: "PATCH",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Task"],
    }),
    // getTask: builder.query<TaskResponese, void>({
    //   query: () => ({
    //     url: `/${Task}`,
    //     method: "GET",
    //     credentials: "include" as const,
    //   }),
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       if (data) {
    //         dispatch(taskAdd(data));
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   },
    //   providesTags: ["Task"],
    // }),
    getTaskById: builder.query<TaskResponese, void>({
      query: (id) => ({
        url: `/${Task}/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Task"],
    }),
  }),
});

export const { useCreateTaskMutation, useUpdateTaskByIdMutation, useGetTaskByIdQuery } = taskApi;