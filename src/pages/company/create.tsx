import { Form, Input, Modal, Select } from "antd";
import CompanyListPage from "./list";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { CREATE_COMPANY_MUTATION } from "@/graphql/mutation";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import OptionWithAvatar from "@/components/select-option-with-avatar";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";

const Create = () => {
  const go = useGo();

  const goToList = () => {
    go({
      to: {
        resource: "companies",
        action: "list",
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "companies",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: () => {
      goToList();
    },
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });

  const { selectProps, queryResult } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <CompanyListPage>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToList}
        title="Create Company"
        width={512}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Company Name"
            name={"name"}
            rules={[{ required: true }]}
          >
            <Input placeholder="Please enter a company name" />
          </Form.Item>
          <Form.Item
            label="Sales Owner"
            name={"salesOwnerId"}
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Please select a sales owner"
              {...selectProps}
              options={
                queryResult.data?.data.map(user => ({
                  value: user.id,
                  label: (
                    <OptionWithAvatar
                      name={user.name}
                      avatarUrl={user.avatarUrl ?? undefined}
                    />
                  ),
                })) ?? undefined
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </CompanyListPage>
  );
};

export default Create;
