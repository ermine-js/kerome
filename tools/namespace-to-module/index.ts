// convert namespace to module

// get filename from command line with yargs

import fs from 'fs'
import path from 'path'
import { Project } from 'ts-morph'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const parse = async () => {
  const argv = await yargs(hideBin(process.argv)).parse()

  // read first argument as filename
  const filename: string = argv._[0] as string

  if (!filename) {
    throw new Error('filename is required')
  }

  // create project
  const project = new Project()

  // add source file
  const sourceFile = project.addSourceFileAtPath(filename)

  // get all namespaces
  const namespaces = sourceFile.getModules()
  for (const ns of namespaces) {
    // get namespace name
    const nsName = ns.getName()
    console.log('namespace name: ', nsName)
    if (!nsName) {
      throw new Error('namespace name is required')
    }

    // const varStatements = ns.getVariableStatements()
    // for (const varStatement of varStatements) {
    //   console.log('var statement: ', varStatement.getText())
    //   console.log('var statement kind: ', varStatement.getKindName())
    // }

    // const funcStatements = ns.getFunctions()

    // get namespace statements
    // const statements = ns.getStatementsWithComments()
    // console.log('ns is: ', ns.getBodyText())

    // create new file
    // const newFile = project.createSourceFile(
    //   path.join(path.dirname(filename), 'modules', `${nsName.replace('chrome.', '')}.ts`),
    //   statements.map((s) => s.getText()).join('\n')
    // )

    const newFile = project.createSourceFile(
      path.join(process.cwd(), 'output', `${nsName.replace('chrome.', '')}.ts`),
      ns.getBodyText()
    )

    // remove namespace
    // ns.remove()

    // save new file
    newFile.saveSync()
  }
}

parse().catch(console.error)
