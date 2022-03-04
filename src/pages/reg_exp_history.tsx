import * as React from "react";
import { Box, Button, List, Text } from 'grommet';
import { Copy, LinkPrevious, Trash } from 'grommet-icons';
import { navigate } from "gatsby";
import Layout from "../components/layout";
import { useLiveQuery } from 'dexie-react-hooks';

import { db, deleteRegExp, TABLE_NAME } from "../utils/storage";

export default function RegExpHistory() {

  const regExps = useLiveQuery(
    () => db.table(TABLE_NAME).toArray()
  );

  if (!regExps) return null; // Still loading

  return (
    <Layout>
      <Button
        label="Back"
        onClick={() => navigate(-1)}
        icon={<LinkPrevious />}
        margin="large"
      />
      <List
        data={regExps}
      >
        {(item: any) => (
          <Box direction="row-responsive" gap="medium" align="center">
            <Text weight="bold">{item.pattern}</Text>
            <Text weight="normal">{item.flags}</Text>
            <Button icon={<Copy />} onClick={() => navigate('/', { state: { pattern: item.pattern, flags: item.flags }})} />
            <Button icon={<Trash />} onClick={() => deleteRegExp(item.id)} />
          </Box>
        )}
      </List>
    </Layout>
  );
}