# Golf Swing Simulator

### Deployment

After you have all the changes done and pushed to main branch, you can deploy the app to github pages by running the following commands:

```
  git checkout -b gh-pages
  git pull origin main
  yarn build
  cp -r build/* .

  git add .
  git commit -m "deploy"
  git push origin gh-pages
```

PS. The `cp -r build/* .` is extremely important for the changes to appear in the build, since the deployed github page considers the entire project to be the source directory.

### Notes:

#### 1. To chage the range values:

Check the file `src/utils/constant.js` file and edit the values from there for min, max, default and step for the slider

#### 2. To change the camera settings:

You will need to go the file `public/lib/OrbitControls.js` and edit the values `phiDelta`, `thetaDelta`, `scale` to change the orientation of the camera.
While following the build steps, this file will be copied/compiled for the final build to reflect the changes.
