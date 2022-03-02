import * as React from "react";
import { Button, List } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { navigate } from "gatsby";
import Layout from "../components/layout";
import { useLiveQuery } from 'dexie-react-hooks';

import { db, TABLE_NAME } from "../utils/storage";

export default function RegExpHistory() {

  const regExps = useLiveQuery(
    () => db.table(TABLE_NAME).toArray()
  );

  function onClickItem (event: any ) {
    const { item, index } = event;
    console.log('Item: ',  item);
    navigate('/', { state: { pattern: item.pattern, flags: item.flags }});
  }

  return (
    <Layout>
      <Button
        label="Back"
        onClick={() => navigate(-1)}
        icon={<LinkPrevious />}
        margin="large"
      />
      <List
        primaryKey="pattern"
        secondaryKey="flags"
        onClickItem={onClickItem}
        data={regExps}
      />
    </Layout>
  );
}